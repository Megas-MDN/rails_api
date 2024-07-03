require "test_helper"

class UserSearchesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get user_searches_index_url
    assert_response :success
  end

  test "should get show" do
    get user_searches_show_url
    assert_response :success
  end

  test "should get create" do
    get user_searches_create_url
    assert_response :success
  end

  test "should get update" do
    get user_searches_update_url
    assert_response :success
  end

  test "should get destroy" do
    get user_searches_destroy_url
    assert_response :success
  end
end
