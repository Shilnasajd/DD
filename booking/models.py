from django.db import models

class Slot(models.Model):
    slot = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.slot
    
class Product(models.Model):
    name = models.CharField(max_length=100) 
    quantity = models.IntegerField()

    def __str__(self):
        return self.name 
    
class Booking(models.Model):
    date = models.DateField()
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.date} - {self.slot}"
