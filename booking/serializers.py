from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
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
        fields = ['id', 'date', 'slot', 'product']

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

        # Extract customer email
        customer_email = 'shilna2447@gmail.com'
        # Email details
        subject = 'Booking Confirmation - DD CAMERAS'
        message = f"""Dear Shilna,

Your booking for "{booking.product.name}" on {booking.date} at slot {booking.slot} is confirmed.

Thank you for choosing DD CAMERAS!

Regards,
DD CAMERAS Team
"""
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [customer_email, 'ddcameras12@gmail.com']  # Send to customer + admin

        # Send email
        send_mail(subject, message, from_email, recipient_list, fail_silently=False)

        return booking