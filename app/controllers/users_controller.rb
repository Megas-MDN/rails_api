class UsersController < ApplicationController
  def index
    @users = User.all()
    render json: @users
  end

  def show
  end

  def create
    @user = User.new(
      key: user_params[:key]
    )
    if @user.save
      render json: @user, status: 200
    else
      render json: {
        error: "Invalid params",
        staus: 400
      }
    end
  end

  def update
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit([:key])
  end
end
