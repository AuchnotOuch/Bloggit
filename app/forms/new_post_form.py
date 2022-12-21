from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class NewPostForm(FlaskForm):
    type = StringField('type', validators=[DataRequired()])
    title = StringField("title")
    content = StringField('content')
    quote_source = StringField('quote_source')
    link_url = StringField('link_url')

    def validate_title(self, title):
        if len(title.data) > 50:
            raise ValidationError('Title must be 50 or less characters')

    def validate_content(self, content):
        if len(content.data) > 10000:
            raise ValidationError('Post text must be 10000 or less characters')

    def validate_quote_source(self, quote_source):
        if len(quote_source.data) > 100:
            raise ValidationError('Quote source must be 100 or less characters')

    def validate_link_url(self, link_url):
        if len(link_url.data) > 300:
            raise ValidationError('Link must be 300 or less characters')

    def validate_title_content(self, type, title, content):
        if type.data == 'text' and not title.data and not content.data:
            raise ValidationError('You must provide either a title or some content')
