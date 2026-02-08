try {
    require('dotenv').config();
    console.log('dotenv ok');
    require('express');
    console.log('express ok');
    require('cors');
    console.log('cors ok');
    require('mongoose');
    console.log('mongoose ok');
    require('./routes/itinerary');
    console.log('itinerary ok');
} catch (e) {
    console.error(e);
}
