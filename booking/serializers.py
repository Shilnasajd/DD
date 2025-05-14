from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.core.exceptions import ObjectDoesNotExist
import random
import string

from .models import (
    Slot, 
    Product, 
    Booking,
    TermsAndConditions,
    PromoCode
    )

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ['id', 'slot']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'date', 'slot', 'product', 'email', 'name', 'phone', 'comment', 'price']

    def validate(self, data):
        product = data['product']
        slot = data['slot']
        date = data['date']

        if product.quantity <= 0:
            raise serializers.ValidationError("This product is out of stock.")

        bookings_for_slot = Booking.objects.filter(product=product, date=date)
        booked_count = bookings_for_slot.count()

        if booked_count >= product.quantity:
            raise serializers.ValidationError("No slots available for this product at this time.")

        return data

    def create(self, validated_data):
        booking = Booking.objects.create(**validated_data)

        customer_email = booking.email
        total_orders_for_email = Booking.objects.filter(email=customer_email).count()

        promocode = None
        # Check if this is the 5th, 10th, 15th, etc. order for this email
        if total_orders_for_email % 5 == 0:
            promocode = self.generate_promocode()
            amount = self.generate_amount(total_orders_for_email)

            # Create a PromoCode entry in the PromoCode table
            self.create_promocode(promocode, amount)

            # Add the promocode to the email context
            context = {
                'name': booking.name,
                'product_name': booking.product.name,
                'date': booking.date,
                'slot': booking.slot,
                'promocode': promocode,
                'price': booking.price,
            }

            # Send promocode email to the customer
            self.send_promocode_email(booking.email, context)

        # Send regular booking confirmation email to customer and admin
        self.send_confirmation_emails(booking)

        return booking

    def generate_promocode(self):
        """Generate a random promocode."""
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

    def generate_amount(self, order_count):
        """Generate an amount alternately 220, 310 based on the order count."""
        return '220' if order_count % 2 == 0 else '310'

    def create_promocode(self, code, amount):
        """Create a PromoCode entry in the database."""
        promocode_entry = PromoCode(code=code, amount=amount, is_valid=True)
        promocode_entry.save()

    def send_promocode_email(self, customer_email, context):
        """Send an email with the promocode to the customer."""
        try:
            customer_html = render_to_string('promocode_email.html', context)
            customer_subject = 'Special Promocode for Your Booking - DD CAMERAS'
            from_email = settings.DEFAULT_FROM_EMAIL
            recipient_list = [customer_email]

            customer_email_message = EmailMessage(
                customer_subject, customer_html, from_email, recipient_list
            )
            customer_email_message.content_subtype = 'html'
            customer_email_message.send(fail_silently=False)
        except Exception as e:
            print(f"Error sending promocode email: {e}")

    def send_confirmation_emails(self, booking):
        """Send confirmation emails to both customer and admin."""
        try:
            context = {
                'name': booking.name,
                'product_name': booking.product.name,
                'date': booking.date,
                'slot': booking.slot,
                'price': booking.price,
                'email': booking.email,
                'comments': booking.comment,
                'phone': booking.phone

            }

            # Send email to customer
            customer_html = render_to_string('customer_email.html', context)
            customer_subject = 'Booking Confirmation - DD CAMERAS'
            from_email = settings.DEFAULT_FROM_EMAIL
            recipient_list = [booking.email]

            customer_email_message = EmailMessage(
                customer_subject, customer_html, from_email, recipient_list
            )
            customer_email_message.content_subtype = 'html'
            customer_email_message.send(fail_silently=False)

            # Send email to admin
            admin_html = render_to_string('admin_email.html', context)
            admin_subject = 'Booking Alert - DD CAMERAS'
            admin_recipient = ['ddcameras12@gmail.com']

            admin_email_message = EmailMessage(
                admin_subject, admin_html, from_email, admin_recipient
            )
            admin_email_message.content_subtype = 'html'
            admin_email_message.send(fail_silently=False)

        except Exception as e:
            print(f"Error sending confirmation emails: {e}")


class MultipleDatesBookingSerializer(serializers.Serializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    email = serializers.EmailField()
    name = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=20, required=False)
    comment = serializers.CharField(max_length=255, required=False, allow_blank=True)
    dates = serializers.ListField(
        child=serializers.DateField(), write_only=True
    )
    price = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate(self, data):
        product = data['product']
        dates = data['dates']

        if product.quantity <= 0:
            raise serializers.ValidationError("This product is out of stock.")

        for date in dates:
            bookings_for_slot = Booking.objects.filter(product=product, date=date)
            booked_count = bookings_for_slot.count()

            if booked_count >= product.quantity:
                raise serializers.ValidationError(f"No slots available for {product.name} on {date}.")

        return data

    def create(self, validated_data):
        dates = validated_data.pop('dates')
        total_price = validated_data.pop('price')  # total price
        per_date_price = total_price / len(dates)  # price per date

        bookings = []

        try:
            default_slot = Slot.objects.get(id=1)
        except ObjectDoesNotExist:
            raise serializers.ValidationError("Default slot not found.")

        email = validated_data.get("email")
        previous_booking_count = Booking.objects.filter(email=email).count()

        for date in dates:
            validated_data['date'] = date
            validated_data['slot'] = default_slot
            validated_data['price'] = per_date_price

            booking = Booking.objects.create(**validated_data)
            bookings.append(booking)

        # Use the first booking for common details
        first_booking = bookings[0]

        context = {
            'name': first_booking.name,
            'product_name': first_booking.product.name,
            'slot': first_booking.slot,
            'email': first_booking.email,
            'comments': first_booking.comment,
            'dates': dates,
            'total_price': total_price,
            'phone': validated_data.get('phone', ''),
        }

        # ✔️ Check for promocode
        current_total_bookings = previous_booking_count + len(dates)
        if current_total_bookings % 5 == 0:
            promocode = self.generate_promocode()
            amount = self.generate_amount(current_total_bookings)

            PromoCode.objects.create(code=promocode, amount=amount, is_valid=True)
            context['promocode'] = promocode

            try:
                promo_html = render_to_string('promocode_email.html', context)
                promo_subject = 'Special Promocode for Your Booking - DD CAMERAS'
                promo_email = EmailMessage(
                    promo_subject, promo_html, settings.DEFAULT_FROM_EMAIL, [email]
                )
                promo_email.content_subtype = 'html'
                promo_email.send(fail_silently=False)
            except Exception as e:
                print(f"Error sending promocode email: {e}")

        # ✔️ Send customer email (once)
        try:
            customer_html = render_to_string('customer.html', context)
            customer_subject = 'Booking Confirmation - DD CAMERAS'
            customer_email = EmailMessage(
                customer_subject, customer_html, settings.DEFAULT_FROM_EMAIL, [email]
            )
            customer_email.content_subtype = 'html'
            customer_email.send(fail_silently=False)
        except Exception as e:
            print(f"Error sending customer email: {e}")

        # ✔️ Send admin email (once)
        try:
            admin_html = render_to_string('admin.html', context)
            admin_subject = 'Booking Alert - DD CAMERAS'
            admin_email = EmailMessage(
                admin_subject, admin_html, settings.DEFAULT_FROM_EMAIL, ['ddcameras12@gmail.com']
            )
            admin_email.content_subtype = 'html'
            admin_email.send(fail_silently=False)
        except Exception as e:
            print(f"Error sending admin email: {e}")

        return bookings

    def generate_promocode(self):
        import random, string
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

    def generate_amount(self, order_count):
        return '220' if order_count % 2 == 0 else '310'

class TermsAndConditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsAndConditions
        fields = '__all__'

class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = ['amount', 'is_valid']