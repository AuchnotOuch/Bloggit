from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class NewCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])

    def validate_comment(self, comment):
        if len(comment.data) > 255:
            raise ValidationError('Comment must be 255 characters or less')
        if len(comment.data) < 1:
            raise ValidationError('Must provide a comment')
