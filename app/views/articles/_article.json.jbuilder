json.extract! article, :id, :title, :description, :link, :created_at, :updated_at
json.url article_url(article, format: :json)
