db.user.drop();
users = [{password: '30274c47903bd1bac7633bbf09743149ebab805f', is_active: false, email: 'mary@demo.org', role:1}, 
         {password: '8843d7f92416211de9ebb963ff4ce28125932878', is_active: true, email: 'wendy@abc.com', role:2}, 
         {password: '30274c47903bd1bac7633bbf09743149ebab805f', is_active: false, email: 'dustin@demo.org', role:2}, 
         {password: '30274c47903bd1bac7633bbf09743149ebab805f', is_active: true, email: 'jenny@demo.org',role:2}, 
         {password: '5bf1fd927dfb8679496a2e6cf00cbe50c1c87145', is_active: true, email: 'fred@gmail.ca',role:2}];
db.user.insert(users);
db.user.ensureIndex({email: 1}, {unique: true});