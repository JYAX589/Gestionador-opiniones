import Publication from './publications.model.js';

export const createComment = async (req, res) =>{
    try {
        const {id: publicationId} = req.params;
        const {content, userId} = req.body;

        const publication = await Publication.findById(publicationId);

        if(!publication) {
            return res.status(404).json({
                message: 'Publication not found'
            })
        }

        const newComment = {
            user: userId,
            content,
        }

        publication.comments.push(newComment);
        await publication.save();

        res.status(201).json(publication);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

export const updatedComment = async (req, res) => {
    try {
        const {publicationId, commentId} = req.params;
        const {content, userId} = req.body;

        const publication = await Publication.findById(publicationId);

        if(!publication) {
            return res.status(404).json({
                message: 'Publication not found'
            })
        }

        const comment = publication.comments.id(commentId)

        if(!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        if(comment.user.toString() !== userId) {
            return res.status(403).json({
                message: 'You are not allowed to update this comment'
            })
        }

        comment.content = content;
        await publication.save();

        res.status(200).json(publication);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

export const deleteComment = async (req, res) =>{
    try {
        const { publicationId, commentId } = req.params;
        const { userId } = req.body;

        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        const comment = publication.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        publication.comments.pull({ _id: commentId });
        await publication.save();

        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}