from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    name = models.CharField("Name", max_length=240)
    phone = models.CharField(max_length=20)
    owner = models.ForeignKey(
        User, related_name="contacts", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name
