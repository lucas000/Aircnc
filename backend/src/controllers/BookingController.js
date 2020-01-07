const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { date } = req.body;
    const { spot_id } = req.params;
    const { user_id } = req.headers;
    
    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    await booking.populate('spot').populate('user').execPopulate();
    
    const ownnerSocket = req.connectedUsers[booking.spot.user];
    
    if (ownnerSocket) {
      req.io.to(ownnerSocket).emit('booking_request', booking);
    }

    return res.json(booking);
  }
};