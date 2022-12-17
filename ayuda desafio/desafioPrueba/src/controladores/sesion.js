


const logInUser = (req, res) => {
    try {
        res.render('login.hbs')
    } catch (error) {
        console.log(`error from logInUser - ${error}`);
    }
}

const logOutUser = (req, res) => {
    try {
        const userName = req.session.user
        req.session.destroy()
        res.render('logout.hbs', {
            userName
        })
    } catch (error) {
        console.log(`error from logOutUser - ${error}`);
    }
}

const postLogIn = (req, res) => {
    try {
        console.log('id de session: ', req.session.id);
        const { user } = req.session.id
        req.session.user = user
        res.redirect('/products')
        // res.render('products.hbs')
    } catch (error) {
        console.log(`Error desde el postLogIn`);
    }
}

export const SessionController = { logInUser, logOutUser, postLogIn }