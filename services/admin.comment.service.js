const { models } = require('../models');

exports.getCommentsIdByProductId = async (producId) => {
    const commentIds = await models.comments.findAll({
            where: ({mobile_id: producId}),
            attributes: ['id'],
        }
    )

    return commentIds.map(function (cur){
        return cur.id;
    });

}

exports.deleteCommentByIds = async (listIds) => {
    models.comments.destroy(
        {
            where: {
                id: listIds
            }
        }
    );
}