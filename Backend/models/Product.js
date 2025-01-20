const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true },
    onSale: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

const newProduct = new Product({
    name: 'Impulse POWER STATION TC2001/TC2000',
    description: 'The Marcy Power Tower TC2000 will help you sculpt the powerful upper body, core, and back you’ve always wanted. An ergonomic vertical knee raise station works your core, while the grip station and the pull-up bar target your abdominal muscles for a powerful upper body workout. The push-up station can also double as a step for other exercises. Built with a sturdy powder-coated steel frame for long-lasting use, plus it features a padded back pad and armrests for your comfort. Strengthens the upper body, core, and back. Multi-grip pull-up station. Vertical knee raise station with deluxe padded armrests and back pad. Integrated push-up station. Dip station sculpts upper body. Sturdy steel frame design.',
    price: 527.00,
    imageUrl: 'https://leadersports.com/media/catalog/product/cache/7dc5787ba525965e7d30aec22d7bb22b/1/3/13070282-101.2.jpg',
    stock: 50,
    onSale: true
});

newProduct.save()
    .then(() => console.log('Product added successfully!'))
    .catch(err => console.error('Error adding product:', err));
