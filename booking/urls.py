from django.urls import path
from .views import (
    SlotListCreateView,
    ProductListCreateView,
    BookingListCreateView,
    GetProductView,
    book_multiple_dates
)

urlpatterns = [
    path('slots/', SlotListCreateView.as_view(), name='slot-list-create'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('bookings/', BookingListCreateView.as_view(), name='booking-list-create'),
    path('get_product/', GetProductView.as_view(), name='check-availability'),
    path('book_multiple_dates/', book_multiple_dates, name='book-multiple-dates'),

]
