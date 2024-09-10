from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ('id', )
        
    def validate(self, attrs: dict):
        name = attrs.get('name')
        description = attrs.get('description', None)
        price = attrs.get('price', None)
        if name == '' or len(name) < 2:
            raise ValidationError({'name': 'Наименование не может быть пустым и должно быть более 2х символов.'})

        if description == '' or description is None:
            # automatic changing the field value, because description is null into db. This is my decision to make
            # like this
            attrs['description'] = 'Описание будет добавлено позже'

        if float(price) < 0 or price is None:
            raise ValidationError({'price': 'Цена не может быть меньше нуля.'})

        return super().validate(attrs)
