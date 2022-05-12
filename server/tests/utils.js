const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');
const { info } = require('../utils/info');

const resetTestDb = async () => {
  await User.deleteMany({});

  const admin = await api.post('/api/users/signup')
    .send({
      username: 'admin',
      password: 'admin1234'
    });
  
  const user1 = await api.post('/api/users/signup')
    .send({
      username: 'user1',
      password: 'user1234'
    });

  const user2 = await api.post('/api/users/signup')
    .send({
      username: 'user2',
      password: 'user1234'
    });

  await User.findByIdAndUpdate(user1.body.id, {
    $push: { 'contacts': user2.body.id }
  });

  await User.findByIdAndUpdate(user2.body.id,
    { $push:
      { 'contacts': user1.body.id }
    }
  );

  //=====
     
  // const res = await api.post('/api/users/sign-on')
  //   .send({
  //     screenName: 'admin',
  //     password: 'admin1234'
  //   });
    
  // const token = res.body.token;

  // const room = await api.post('/api/rooms')
  //   .set({
  //     Authorization: `bearer ${token}`
  //   })
  //   .send({
  //     users: [
  //       admin.body.id,
  //       root.body.id
  //     ]
  //   });
  
  // await api.post('/api/messages')
  //   .set({
  //     Authorization: `bearer ${token}`
  //   })
  //   .send({
  //     author: admin.body.id,
  //     room: room.body.id,
  //     text: 'this is an existing messages',
  //     timestamp: 'Fri May 01 2022 18:00:00 GMT-1000 (Hawaii-Aleutian Standard Time)'
  //   });
};

const reset = async () => {
  await resetTestDb();
  await require('mongoose').connection.close();
  info('test Db reset complete')
}

module.exports = {
  resetTestDb,
  reset
};
