from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from .models import (
    Slot, Product, Booking
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

        # Render email HTML template
        html_message = render_to_string('customer_email.html', context)
        subject = 'Booking Confirmation - DD CAMERAS'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [customer_email, 'ddcameras12@gmail.com']

        # Send email
        email = EmailMessage(subject, html_message, from_email, recipient_list)
        email.content_subtype = 'html'
        email.send(fail_silently=False)

        return booking