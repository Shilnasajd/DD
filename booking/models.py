from django.db import models

    
class Slot(models.Model):
    slot = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.slot
    
class Product(models.Model):
    name = models.CharField(max_length=100) 
    one_line = models.CharField(null=True)
    quantity = models.IntegerField()
    short_description = models.TextField(null=True)
    description = models.TextField(null=True)
    price = models.CharField(null=True)
    image = models.CharField(null=True)

    def __str__(self):
        return self.name 
    
class Booking(models.Model):
    date = models.DateField()
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price =  models.DecimalField(max_digits=10, decimal_places=2, null=True) 
    name = models.CharField(max_length=50, null=True)
    email = models.EmailField(null=True)
    phone = models.CharField(max_length=15, null=True)
    comment = models.CharField(max_length=255, null=True, blank=True)


    def __str__(self):
        return f"{self.date} - {self.slot}"
    
class PromoCode(models.Model):
    code = models.CharField(null=True)
    amount = models.CharField(null=True)
    is_valid = models.BooleanField(default=True)

class TermsAndConditions(models.Model):
    email = models.EmailField(null=True)
    time = models.DateTimeField(auto_now_add=True)

