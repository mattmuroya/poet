const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");
const Message = require("../models/message");

const populateProdData = async () => {
  await Message.deleteMany({});
  await User.deleteMany({});

  // create admin
  const mattmuroya = await api.post("/api/users/register").send({
    username: "mightymorphinmatt",
    password: process.env.mattmuroya,
  });

  // make guest friends with mattmuroya
  // await User.findByIdAndUpdate(mattmuroya.body.user.id, {
  //   $push: { friends: guest.body.user.id },
  // });

  // await User.findByIdAndUpdate(guest.body.user.id, {
  //   $push: { friends: mattmuroya.body.user.id },
  // });

  // await Message.create({
  //   sender: mattmuroya.body.user.id,
  //   recipient: guest.body.user.id,
  //   text: "Hi! I'm Matt Muroya. Thanks for checking out Poet Instant Messenger! I'd love to hear your feedback, suggestions or bug reports. Feel free to create an account and message me right here in the app! Or, send me an email or message on LinkedIn :)",
  // });

  // create users

  const pokemon = await api.post("/api/users/register").send({
    username: "p0k3m0n_m45t3r",
    password: process.env.p0k3m0n_m45t3r,
  });

  await api.post("/api/users/register").send({
    username: "iLuvNickCarter99",
    password: process.env.iLuvNickCarter99,
  });

  const nirvana = await api.post("/api/users/register").send({
    username: "xXx_NIRVANA_xXX",
    password: process.env.xXx_NIRVANA_xXX,
  });

  const zeldagirl = await api.post("/api/users/register").send({
    username: "ZeldaGirl94",
    password: process.env.ZeldaGirl94,
  });

  await api.post("/api/users/register").send({
    username: "mjordan_23",
    password: process.env.mjordan_23,
  });

  await api.post("/api/users/register").send({
    username: "T4m4gotchi_T4ny4",
    password: process.env.T4m4gotchi_T4ny4,
  });

  const timberlake = await api.post("/api/users/register").send({
    username: "timberlake",
    password: process.env.timberlake,
  });

  await api.post("/api/users/register").send({
    username: "MsRachelGreen",
    password: process.env.MsRachelGreen,
  });

  // create guest
  const guest = await api.post("/api/users/register").send({
    username: "guest",
    password: process.env.GUEST_PW,
  });

  // make guest friends with timberlake and zelda

  await User.findByIdAndUpdate(guest.body.user.id, {
    $push: { friends: timberlake.body.user.id },
  });

  await User.findByIdAndUpdate(timberlake.body.user.id, {
    $push: { friends: guest.body.user.id },
  });

  await Message.create({
    sender: guest.body.user.id,
    recipient: timberlake.body.user.id,
    text: "hey justin!",
  });

  await Message.create({
    sender: timberlake.body.user.id,
    recipient: guest.body.user.id,
    text: "hey man what's up!",
  });

  await Message.create({
    sender: guest.body.user.id,
    recipient: timberlake.body.user.id,
    text: "ur in a band right? i was messing around with some lyrics and got this cool song i wanna show you",
  });

  await Message.create({
    sender: timberlake.body.user.id,
    recipient: guest.body.user.id,
    text: "dude right on! what's it called?",
  });

  await Message.create({
    sender: guest.body.user.id,
    recipient: timberlake.body.user.id,
    text: "it's called Bye Bye Bye, and i made up this cool dance to go along with it too",
  });

  await Message.create({
    sender: timberlake.body.user.id,
    recipient: guest.body.user.id,
    text: "awesome, we're having a band practice this weekend if u wanna swing by and teach us!",
  });

  await User.findByIdAndUpdate(guest.body.user.id, {
    $push: { friends: zeldagirl.body.user.id },
  });

  await User.findByIdAndUpdate(zeldagirl.body.user.id, {
    $push: { friends: guest.body.user.id },
  });

  await Message.create({
    sender: zeldagirl.body.user.id,
    recipient: guest.body.user.id,
    text: "heyyy did u beat Ocarina of Time yet???",
  });

  await Message.create({
    sender: guest.body.user.id,
    recipient: zeldagirl.body.user.id,
    text: "my cousin is borrowing my N64 til next friday :-( don't spoil it for me!",
  });

  await Message.create({
    sender: zeldagirl.body.user.id,
    recipient: guest.body.user.id,
    text: "haha ok! btw u should come over tmrw after school! i just got this 2 player game called goldeneye",
  });

  await Message.create({
    sender: zeldagirl.body.user.id,
    recipient: guest.body.user.id,
    text: "i think my mom is making homemade pizza ;)",
  });

  await Message.create({
    sender: guest.body.user.id,
    recipient: zeldagirl.body.user.id,
    text: "OMG ur mom's pizza is da BOMB! c u 2morrow!",
  });

  // send request to nirvana
  await User.findByIdAndUpdate(guest.body.user.id, {
    $push: { invitesSent: nirvana.body.user.id },
  });

  await User.findByIdAndUpdate(nirvana.body.user.id, {
    $push: { invitesReceived: guest.body.user.id },
  });

  // receive request from pokemon

  await User.findByIdAndUpdate(pokemon.body.user.id, {
    $push: { invitesSent: guest.body.user.id },
  });

  await User.findByIdAndUpdate(guest.body.user.id, {
    $push: { invitesReceived: pokemon.body.user.id },
  });
};

const closeConnection = async () => {
  await mongoose.connection.close();
};

const populate = async () => {
  await populateProdData();
  await closeConnection();
  console.log("production Db reset complete");
};

module.exports = {
  // populateProdData,
  // closeConnection,
  populate,
};
