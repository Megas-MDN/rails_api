class UserSearchesController < ApplicationController
def index
    @users = UserSearch.all()
    render json: @users
  end

  def show
     @search = UserSearch.where('LOWER(?) LIKE LOWER(search) || \'%\' AND user_id = ?', params[:id], params[:idUser]).all

    render json: {
      search: @search,
      user_id:  params[:idUser],
    }
  end

  def create
    @user = User.find_by(id:  params[:user_id])
    if @user
      @search = UserSearch.where('LOWER(?) LIKE LOWER(search) || \'%\' AND user_id = ?', params[:search], params[:user_id]).first
      if @search 
        size_original =  @search.search.to_s.length
        size_param = user_search_params[:search].to_s.length
        if size_param > size_original
          @search.update(
            search: params[:search]
          )
          render json: {
            message: "Updated",
            search: @search
          }
        else
          render json: {
            message: "Alredy Exist",
            search: @search
          }
        end
      else
        @search_slice = UserSearch.where('LOWER(search) LIKE LOWER(?) || \'%\' AND user_id = ?', params[:search], params[:user_id]).first
        if @search_slice
          render json: {
            message: "Alredy Exist sliced",
            search: @search_slice
          }
        else
          @new_search = UserSearch.new(
            search: user_search_params[:search],
            user_id: user_search_params[:user_id]
          )
          if @new_search.save
            render json: @new_search, status: 201
          else
            render json: {
              error:  @new_search.errors,
              staus: 400
            }
          end
        end
      end
    else
      render json: {
        error:  @user.errors,
        staus: 404
      }
    end

  end

  def update
    @user = User.find_by(id:  params[:id])
    if @user
      @search = UserSearch.where('LOWER(?) LIKE LOWER(search) || \'%\' AND user_id = ?', params[:search], params[:id]).first
      
      if @search 
        @search.update(
        search: params[:search]
        )
        render json: @search
      else
        render json: @search
      end
    else
      render json: @user.errors, status: 404
    end
  end

  def destroy
    @user = UserSearch.find_by(id:  params[:id])
    if @user
      @user.destroy()
    render json: @user
    else
      render json: @user.errors, status: 400
    end
  end

  private
  def user_search_params
    params.require(:user_search).permit([
      :search,
      :user_id, 
    ])
  end
end
