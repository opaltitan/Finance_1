/**
 * Created by Justin on 5/1/2016.
 */
exports.render = function(req, res) {
    res.render('index', {
        title: 'Asset Management System',
        user: JSON.stringify(req.user)
    });
};