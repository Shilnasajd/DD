from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.core.exceptions import ObjectDoesNotExist

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
        fields = ['id', 'date', 'slot', 'product', 'email', 'name', 'phone', 'comment']

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
        context = {
            'name': booking.name,
            'product_name': booking.product.name,
            'date': booking.date,
            'slot': booking.slot,
        }

        # Send email to customer
        try:
            customer_html = render_to_string('customer_email.html', context)
            customer_subject = 'Booking Confirmation - DD CAMERAS'
            from_email = settings.DEFAULT_FROM_EMAIL
            recipient_list = [customer_email]

            customer_email_message = EmailMessage(
                customer_subject, customer_html, from_email, recipient_list
            )
            customer_email_message.content_subtype = 'html'
            customer_email_message.send(fail_silently=False)
        except Exception as e:
            # Log the error or handle it accordingly
            print(f"Error sending customer email: {e}")

        # Send email to admin
        try:
            admin_html = render_to_string('admin_email.html', context)
            admin_subject = 'Booking Alert - DD CAMERAS'
            admin_recipient = ['ddcameras12@gmail.com']

            admin_email_message = EmailMessage(
                admin_subject, admin_html, from_email, admin_recipient
            )
            admin_email_message.content_subtype = 'html'
            admin_email_message.send(fail_silently=False)
        except Exception as e:
            # Log the error or handle it accordingly
            print(f"Error sending admin email: {e}")

        return booking


class MultipleDatesBookingSerializer(serializers.Serializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    email = serializers.EmailField()
    name = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=20, required=False)
    comment = serializers.CharField(max_length=255, required=False, allow_blank=True)
    dates = serializers.ListField(
        child=serializers.DateField(), write_only=True
    )

    def validate(self, data):
        product = data['product']
        dates = data['dates']

        # Validate product quantity
        if product.quantity <= 0:
            raise serializers.ValidationError("This product is out of stock.")

        # Validate each date
        for date in dates:
            bookings_for_slot = Booking.objects.filter(product=product, date=date)
            booked_count = bookings_for_slot.count()

            if booked_count >= product.quantity:
                raise serializers.ValidationError(f"No slots available for {product.name} on {date}.")

        return data

    def create(self, validated_data):
        dates = validated_data.pop('dates')
        bookings = []

        try:
            # Get the default slot instance (if it exists)
            default_slot = Slot.objects.get(id=1)  # Assuming '1' is the default slot
        except ObjectDoesNotExist:
            raise serializers.ValidationError("Default slot not found.")

        for date in dates:
            validated_data['date'] = date
            validated_data['slot'] = default_slot  # Assign the Slot instance

            # Create the booking
            booking = Booking.objects.create(**validated_data)
            bookings.append(booking)

            # Send email to customer
            customer_email = booking.email
            context = {
                'name': booking.name,
                'product_name': booking.product.name,
                'date': booking.date,
                'slot': booking.slot,
            }

            # Send email to customer
            try:
                customer_html = render_to_string('customer_email.html', context)
                customer_subject = 'Booking Confirmation - DD CAMERAS'
                from_email = settings.DEFAULT_FROM_EMAIL
                recipient_list = [customer_email]

                customer_email_message = EmailMessage(
                    customer_subject, customer_html, from_email, recipient_list
                )
                customer_email_message.content_subtype = 'html'
                customer_email_message.send(fail_silently=False)
            except Exception as e:
                print(f"Error sending customer email: {e}")

            # Send email to admin
            try:
                admin_html = render_to_string('admin_email.html', context)
                admin_subject = 'Booking Alert - DD CAMERAS'
                admin_recipient = ['ddcameras12@gmail.com']

                admin_email_message = EmailMessage(
                    admin_subject, admin_html, from_email, admin_recipient
                )
                admin_email_message.content_subtype = 'html'
                admin_email_message.send(fail_silently=False)
            except Exception as e:
                print(f"Error sending admin email: {e}")

        return bookings

class TermsAndConditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsAndConditions
        fields = '__all__'

class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = ['amount', 'is_valid']