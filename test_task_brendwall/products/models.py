from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=128, verbose_name='Наименование')
    description = models.CharField(max_length=256, verbose_name='Описание', null=True, blank=True)
    price = models.FloatField(default=0.0, verbose_name='Цена, в рублях')

    def __str__(self):
        return f'{self.name} - {self.price}₽'
