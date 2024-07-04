class UsersController < ApplicationController
  def index
    @users = User.all()
    render json: @users
  end

  def show
    @user = User.find_by(key:  params[:id])

    render json: @user
  end

  def create
    @user = User.new(
      key: user_params[:key]
    )
    if @user.save
      render json: @user, status: 201
    else
      render json: {
        error: "Invalid params",
        staus: 400
      }
    end
  end

  def update
    @user = User.find_by(id:  params[:id])
    if @user
      @user.update(
        key: params[:key]
      )
    render json: @user
    else
      render json: @user.errors, status: 400
    end
  end

  def destroy
    @user = User.find_by(id:  params[:id])
    if @user
      @user.destroy()
    render json: @user
    else
      render json: @user.errors, status: 400
    end
  end

  private
  def user_params
    params.require(:user).permit([:key])
  end
end
