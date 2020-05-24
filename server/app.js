const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const model = require('./models/User');
const fs = require('fs');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/freelance', {
    useNewUrlParser: true
});
const dbCon = mongoose.connection;
dbCon.on("error", console.log.bind(console, "Bağlantı hatası"));
dbCon.once("open", () => {
    console.log('Veritabanına bağlandı');
});

const urlEncodedParser = bodyParser.urlencoded({
    extended: false
});
app.use(urlEncodedParser);
app.use(bodyParser.json());


const User = require('./models/User');
const Job = require('./models/Job').Job;
const Intern = require('./models/Intern');
const Employer = require('./models/Employer');
const Category = require('./models/Job').Category;
const University = require('./models/University');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
		console.log(username + password);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch){
                        if(user.isVerified == false){
                            return done(null, false, { message: 'Hesabınız doğrulanmamıştır' });
                        }
                        return done(null, user);
                    }
                    else{
                        return done(null, false, { message: 'Hatalı şifre!' });
                    }
                })
    });
  }
));

passport.serializeUser((user, done)=> done(null, user.id));
    passport.deserializeUser((id, done)=>{
        if(this.email.includes('edu.tr')){
            User.findById(id, (err, user) => {
                done(err, user);
            });
        }
        else{
            Employer.findById(id, (err, user) => {
                done(err, user);
            });
        }
});
	
app.post('/', 
  passport.authenticate('local', { failureRedirect: '/failure' }),
  function(req, res) {
	  res.send({deger: true});
});

app.get('/failure', (req, res) => {
	res.send({deger: false});
});

app.get('/jobs', (req, res) => {
	Job.find({}, (err, data) => {
		res.send(data.sort(function(a,b){
                    return (b.lastDate.getTime() - a.lastDate.getTime());
                }));
	}).then(() => {});
});

app.get('/job/getCategory', (req, res) => {
	Category.find({}, (err, data) => {
		res.send(data);
	}).then(() => {});
});

app.post('/job/sendOffer/:id', (req, res) => {
	console.log(req.params.id);
	console.log(req.body.username);
	console.log(req.body.offer);
	res.send(true);
});

app.get('/user/offersData/:id', (req, res) => {
	console.log('asda');
	let Collection = '';
    image = [];
	reply = [];
	deger = {};
	userImage = undefined;
    decodedImage = undefined;
    Job.findById(req.params.id, (err, data) => {
        deger = data;
    }).then( () => {
            User.find({ }, (err, docs) => {
                docs.forEach((el) =>{
                    for(let i=0;i<deger.offers.length;i++){
                        if(el.email == deger.offers[i].email){
							deImage = typeof el.img != 'undefined' ? el.img.data : undefined;
                            image.push({ email: el.email,
                                        decodedImage: deImage,
							});
						}
					}
					for(let i=0;i<deger.reply.length;i++){
                        if(el.email == deger.reply[i].email){
							deImage = typeof el.img != 'undefined' ? el.img.data : undefined;
                            reply.push({ email: el.email,
                                        decodedImage: deImage,
							});
						}
					}
					if(el.email === deger.email)
						userImage = typeof el.img != 'undefined' ? el.img.data : undefined;
                });
            }).then(() => {
                res.send({image, reply, userImage});;
            }).catch(() => {});
        }).catch((err) => { console.log(err) });
});

app.get('/user/jobReply/:id', (req, res) => {
	datas = [];
	replies = [];
	Job.findOne({ _id: req.params.id }, (err, doc) => {
		replies = doc.reply;
	}).then(() => {
		User.find({}, (err, data) => {
			for(let i=0;i<replies.length;i++){
				for(let j=0;j<data.length;j++){
					if(replies[i].email == data[j].email){
						datas.push(data[j]);
					}
				}
			}
		}).then(() => {
			res.send(datas);
		});
	});
});

app.get('/user/prof/:username', (req, res) => {
	User.findOne({username: req.params.username}, (err, data) => {
		res.send(data);
	}).then(() => {})
	.catch((err) => console.log(err));
});

app.post('/user/myjobs', (req, res) => {
	Job.find({email: req.body.email}, (err, data) => {
		res.send(data);
	}).then(() => {})
	.catch((err) => console.log(err));
});

app.post('/job/deleteJob', (req, res) => {
});

app.post('/user/myworks', (req, res) => {
	Job.find({"acceptedOffer.email": req.body.email}, (err, data) => {
		res.send(data);
	}).then(() => {})
	.catch((err) => console.log(err));
});

app.get('/interns', (req, res) => {
	Intern.find({}, (err, data) => {
		res.send(data);
	});
});

app.post('/profile', (req, res) => {
    User.findOne({username: req.body.username}, (err, data) => {
        console.log(req.body.username);
        res.send(data);
    }).then(() => {
    });
});

app.get('/user/talents/:email', (req, res) => {
	User.findOne({email: req.params.email}, (err, data) => {
		res.send(data.talent);
	}).then(() => {});
});

app.get('/user/talents/addItem/:talent', (req, res) => {
    let yetenekler = [];
    let boolTalent = false;
    User.findOne({ username: 'SinaBakan' }, (err, data) => {
        yetenekler = data.talent;
        yetenekler.forEach((el) => {
            if(el.content == req.params.talent)
                boolTalent = true;
        });
    }).then(()=>{
        if(!boolTalent)
            yetenekler.push({ content: req.params.talent });
    }).then(() => {
        User.findOneAndUpdate( { username: 'SinaBakan' }, { talent: yetenekler }, 
		{new: true}, (err, doc) => {
			res.send(doc.talent);
        }).then(() => {});
    }).catch((err) => {console.log(err)});
});

app.post('/user/talents/deleteTalent/:email', (req, res) => {
    yetenekler = [];
	User.findOne({email: req.params.email}, (err, data) => {
		data.talent.forEach((el) => {
			if(req.body.item !== el.content){
				yetenekler.push({content: el.content});
			}
		});
	}).
	then(() => {
		User.findOneAndUpdate({email: req.params.email}, {talent: yetenekler},
		{new: true}, (err, doc) => {
			res.send(doc.talent);
		}).then(() => {});
	});
});

app.post('/user/talents/edit/:email', (req, res) => {
	yetenekler = [];
	User.findOne({email: req.params.email}, (err, data) => {
		data.talent.forEach((el) => {
			if(req.body.item === el.content){
				yetenekler.push({content: req.body.editedItem});
			}
			else{
				yetenekler.push({content: el.content});
			}
		});
	}).
	then(() => {
		User.findOneAndUpdate({email: req.params.email}, {talent: yetenekler},
		{new: true}, (err, doc) => {
			res.send(doc.talent);
		}).then(() => {});
	});
});

app.get('/getUniversity', (req, res) => {
	University.find({}, (err, data) => {
		console.log(data);
		res.send(data);
	}).then(() => {});
});
	
app.post('/user/signup', (req, res) => {
	console.log(req.body);
	const {username, password, mail, university, cv } = req.body;
        User.findOne({ email: email}).then( user => {
            if(user){
                res.send({deger: false, message: 'Bu bilgilere sahip bir kullanıcı var'});
            }
            else{
                    const newStudent = new User({
                        username,
                        password,
                        email: mail,
                        date: Date.now(),
                        university,
                        cv,
                        notificate
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newStudent.password, salt, (err, hash) => {
                            if(err)
                                throw err;
                            newStudent.password = hash;
                            newStudent.save().then( user => {
                                const newToken = new ValToken({
                                    _userId: user.id, token: crypto.randomBytes(16).toString('hex')
                                })
                                newToken.save().then(() => {
                                    var mailOptions = {
                                        from:' <freelanceprojesi@gmail.com>', 
                                        to: mail,
                                        subject: 'Hesap Doğrulama', 
                                        text: 'Merhaba,\n\n' + 'Lütfen hesabınızı aşağıdaki ' + 
                                        'linke tıklayarak doğrulayınız: \nhttp:\/\/' + req.headers.host + 
                                        '\/user\/confirm\/' + newToken.token + '.\n'
                                    };

                                    transporter.sendMail(mailOptions, function(error, info){
                                        if(error){
                                            console.log(error);
                                        }
                                    });
                                })
                            }).then(() => {
								res.send({deger: true, message: 'Kullanıcı kaydı tamamlandı'});
                            }).catch((err) => console.log(err));
                        })
                    })
                }
            }).catch((err)=>{console.log(err)});
});

app.get('/download/:id', (req, res) => {
    let filename = '';
    Job.findById( { _id: req.params.id }, (err, data) => {
        if(data.file){
            filename = data.file.fileName;
            fs.writeFileSync(data.file.fileName, data.file.fileData.buffer);
        }
    }).then(() => {
        res.download('./' + filename, (err) => {
            fs.unlink('./' + filename, (err) => {
				console.log(err);
				res.send(true);
        });
    })
	}).catch(() => {});
});

app.post('/job/uploadJob', (req, res) => {
	console.log(req.body);
	res.send(true);
});

app.post('/intern/uploadIntern', (req, res) => {
	console.log(req.body);
	const { name, mail, city, tur, info, linkedin, intern_link, upMail, imkan} = req.body
	const yol = imkan.yol == true ? 'on' : 'off';
	const yemek = imkan.yemek == true ? 'on' : 'off';
	const maas = imkan.maas == true ? 'on' : 'off';
	const yer = imkan.yer == true ? 'on' : 'off';
        const newIntern = new Intern({
            name, mail, city, tur, info, linkedin, intern_link, upMail: upMail, imkan: {
                yol, yemek, maas, yer
            }});
        newIntern.save().then(() => {
			res.send({deger: true, message: 'Stajınız yüklenmiştir.'});
        }).catch((err) => {
            console.log(err);
        });
});

app.post('/job/reply', (req, res) => {
    image = [];
	reply = [];
	deger = {};
	userImage = undefined;
    decodedImage = undefined;
	let Collection = req.body.email.match(/edu.tr/) === null ? Employer : User;
    const comment = req.body.reply;
    let dizi= [];
        Job.findById({ _id: req.params.id }, (err, data) => {
            dizi = typeof data.reply != 'undefined' ? data.reply : [];
            title = data.title;
        }).then( () => {
            Collection.findOne({ email: req.session.email }, (err, doc) => {
                dizi.push( { email: req.session.email, username: doc.username, rep: comment });
            }).then(() => {
                Job.findOneAndUpdate( { _id: req.params.id }, { reply: dizi}).
                then(() => {
					
					Job.findById(req.params.id, (err, data) => {
        deger = data;
    }).then( () => {
            User.find({ }, (err, docs) => {
                docs.forEach((el) =>{
                    for(let i=0;i<deger.offers.length;i++){
                        if(el.email == deger.offers[i].email){
							deImage = typeof el.img != 'undefined' ? el.img.data : undefined;
                            image.push({ email: el.email,
                                        decodedImage: deImage,
							});
						}
					}
					for(let i=0;i<deger.reply.length;i++){
                        if(el.email == deger.reply[i].email){
							deImage = typeof el.img != 'undefined' ? el.img.data : undefined;
                            reply.push({ email: el.email,
                                        decodedImage: deImage,
							});
						}
					}
					if(el.email === deger.email)
						userImage = typeof el.img != 'undefined' ? el.img.data : undefined;
                });
            }).then(() => {
                res.send({image, reply, userImage});;
            }).catch(() => {});
        }).catch((err) => { console.log(err) });
                    res.send(dizi);
                }).catch((err)=>{ console.log(err) });
            }).catch(()=>{});
        }).catch(()=>{});
});

const server = app.listen(8080, (req, res) => {
    console.log('8080 dinleniyor');
});
