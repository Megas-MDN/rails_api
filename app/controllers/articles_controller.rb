class ArticlesController < ApplicationController
 
  # GET /articles or /articles.json
  def index
    if params[:search]
      @articles_filtred = Article.where('LOWER(title) LIKE \'%\' || LOWER(?) || \'%\' OR LOWER(description) LIKE \'%\' || LOWER(?) || \'%\'', params[:search], params[:search]).all 
      render json: @articles_filtred
    else
      @articles = Article.all
      render json: @articles
    end

  end

  # GET /articles/1 or /articles/1.json
  def show
    @article = Article.find_by(id: params[:id])
    render json:  @article
  end

  # GET /articles/new
  def new
    @article = Article.new
  end

  # GET /articles/1/edit
  def edit
  end

  # POST /articles or /articles.json
  def create
    @article = Article.new(article_params)

    respond_to do |format|
      if @article.save
        format.html { redirect_to article_url(@article), notice: "Article was successfully created." }
        format.json { render :show, status: :created, location: @article }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /articles/1 or /articles/1.json
  def update
    respond_to do |format|
      if @article.update(article_params)
        format.html { redirect_to article_url(@article), notice: "Article was successfully updated." }
        format.json { render :show, status: :ok, location: @article }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/1 or /articles/1.json
  def destroy
    @article.destroy!

    respond_to do |format|
      format.html { redirect_to articles_url, notice: "Article was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def article_params
      params.require(:article).permit(:title, :description, :link)
    end
end
