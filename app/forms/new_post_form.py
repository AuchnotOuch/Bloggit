from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class NewPostForm(FlaskForm):
    type = StringField('type', validators=[DataRequired()])
    title = StringField("title")
    content = StringField('content')
    quote_source = StringField('quote_source')
    link_url = StringField('link_url')
    image_url = StringField('image_url')
    image_caption = StringField('image_caption')

    def validate_title(self, title):
        if title.data and len(title.data) > 500:
            raise ValidationError('Title must be 500 or less characters')

    def validate_content(self, content):
        if content.data and len(content.data) > 10000:
            raise ValidationError('Post text must be 10000 or less characters')

    def validate_quote_source(self, quote_source):
        if quote_source.data and len(quote_source.data) > 100:
            raise ValidationError('Quote source must be 100 or less characters')

    def validate_link_url(self, link_url):
        if link_url.data and len(link_url.data) > 300:
            raise ValidationError('Link must be 300 or less characters')
