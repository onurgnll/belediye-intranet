const { where, Sequelize, Op, QueryTypes } = require("sequelize");
const CustomError = require("../errors/CustomError");
const { User, Telephone, Personel,DestekCevap, Duyuru, DuyuruResim, sequelize, Destek, DestekResim,Survey } = require("../models");
const Response = require("../responses/response");
const { generateAccessToken } = require("../helpers/token");
const login = async (req, res, next) => {
    try {

        const { username, password } = req.body

        const isUser = await User.findOne({
            where: {
                user_name: username
            }
        })

        if (!isUser) {
            return res.json(new Response(-1, null, "Böyle bir kullanıcı bulunamadı"))
        }

        if (isUser.user_pass != password) {

            return res.json(new Response(-1, null, "Hatalı şifre girdiniz."))
        }


        const token = {
            accessToken: generateAccessToken(isUser.user_id),
        }
        await User.update(
            {
                accessToken: token.accessToken,
            },
            {
                where: { user_id: isUser.user_id },
            }
        );


        const updatedUser = await User.findOne({
            where: {
                user_id: isUser.user_id,
            },
            attributes: { exclude: ['user_pass', 'accessToken'] }
        });

        // Başarılı yanıt döndür
        res.status(200).json(new Response(1, { user: updatedUser, token }, "success"));



    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const getPhoneNumbers = async (req, res, next) => {
    try {

        const { name, department, phone } = req.body


        const telephones = await Telephone.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: `%${name}%` // Case-insensitive substring match
                },
                state: {
                    [Sequelize.Op.like]: `%${department}%` // Case-insensitive substring match

                },
                telephone: {
                    [Sequelize.Op.like]: `%${phone}%` // Case-insensitive substring match

                }
            }
        });
        res.status(200).json(new Response(1, { telephones }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const getDuyuru = async (req, res, next) => {
    try {

        const duyurular = await Duyuru.findAll({
            include: {
                model: DuyuruResim,
                as: "duyuruResimler"
            }
        })


        res.status(200).json(new Response(1, { duyurular }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const getHasBirthdayPersons = async (req, res, next) => {
    try {
        const today = new Date();
        const month = today.getMonth() + 1; // getMonth() returns 0-based month index
        const day = today.getDate();

        // Kullanıcıların doğum tarihlerini karşılaştırmak için bir BETWEEN sorgusu kullanabilirsiniz.
        const query = `
            SELECT * 
            FROM personel 
            WHERE MONTH(DogumTarihi) = :month 
            AND DAY(DogumTarihi) = :day
        `;
        const users = await sequelize.query(query, {
            replacements: { month, day },
            type: QueryTypes.SELECT
        });

        res.status(200).json(new Response(1, { users }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const createDestek = async (req, res, next) => {
    try {
        const { title, description } = req.body
        let link
        if (req.file) {

            link = (process.env.DEVELOPMENT ? "http://" : "https://") + process.env.WORKING_ON + ":" + process.env.PORT + "/destek/" + req.file.filename
        }


        const destek = await Destek.create({
            title, content: description, userID: req.user.result
        })

        if (req.file) {
            console.log(link);

            await DestekResim.create({ destekID: destek.id, resim: link })
        }
        res.status(200).json(new Response(1, { destek }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const getDestekler = async (req, res, next) => {
    try {
        const destekler = await Destek.findAll({
            where: {
                userID: req.user.result
            },
            include: [
                {
                    model: DestekResim,
                    as: "destekResimler"
                },
                {
                    model: DestekCevap,
                    as: "destekCevaplar"
                }
            ]
        })
        res.status(200).json(new Response(1, { destekler }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}



const getMainDuyuru = async (req, res, next) => {
    try {
        const duyuru = await Duyuru.findOne({
            where: {
                isMain: true
            },
            include: {
                model: DuyuruResim,
                as: "duyuruResimler"
            }
        })

        res.status(200).json(new Response(1, { duyuru }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const getMainAnket = async (req, res, next) => {
    try {
        const anket = await Survey.findOne({
            where: {
                isMain: true
            },
        })
        if(!anket) return res.status(200).json(new Response(-1, { }, "Main Anket Bulunamadı"));

        res.status(200).json(new Response(1, { anket }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

module.exports = {
    login,
    getDuyuru,
    getHasBirthdayPersons,
    getPhoneNumbers,
    createDestek,
    getDestekler,
    getMainAnket,
    getMainDuyuru
}