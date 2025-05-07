from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .models import (
    Slot,
    Product,
    Booking
    )
from .serializers import (
    SlotSerializer,
    ProductSerializer,
    BookingSerializer,
    MultipleDatesBookingSerializer
    )

class SlotListCreateView(generics.ListCreateAPIView):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class GetProductView(APIView):
    def get(self, request, *args, **kwargs):
        product_id = request.query_params.get('product')
        date = request.query_params.get('date')
        if not product_id or not date:
            return Response(
                {'detail': 'Both "product" and "date" query parameters are required.'},
                status=400
            )

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'detail': 'Product not found.'}, status=404)

        availability = []
        booked_count = Booking.objects.filter(
            product=product,
            date=date
        ).count()

        remaining = product.quantity - booked_count
        if remaining <= 0:
            remaining = 'Out of stock'

        availability.append({
            'product_id':    product.id,
            'name':  product.name,
            'one_line': product.one_line,
            'short_description': product.short_description,
            'description': product.description,
            'price': product.price,
            'image': product.image,
            'available':  remaining
        })

        return Response(availability)
    
@api_view(['POST'])
def book_multiple_dates(request):
    serializer = MultipleDatesBookingSerializer(data=request.data)

    if serializer.is_valid():
        bookings = serializer.save()
        return Response(
            {"message": f"Successfully booked {len(bookings)} dates."},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)