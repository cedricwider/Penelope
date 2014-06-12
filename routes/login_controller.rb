class Penelope < Sinatra::Application

  post '/login' do
    user_doc = find_user(params['email'], params['password'])
    if user_doc.nil?
      redirect to('/')
    end

    @user = User.new
    @user._id = user_doc['_id']
    @user.email = user_doc['email']
    @user.firstname =user_doc['firstname']
    @user.lastname =user_doc['lastname']
    session['user'] = @user
    redirect to('/app')
  end

  get '/signup' do
    haml :signup, :attr_wrapper => '"'
  end

  post '/signup' do
    @user = User.new
    @user.email = params['email']
    @user.firstname = params['firstname']
    @user.lastname = params['lastname']
    unless DB.collection('user').find_one({:email => @user.email}).nil?
      return haml :signup, :attr_wrapper => '"', :locals => {errors: ['existing_email']}
    end

    user_id = DB.collection('user').insert({:email=>@user.email, :firstname=>@user.firstname, :lastname=>@user.lastname})
    @user._id = user_id
    login_request = LoginData.new
    login_request.password = params['password']
    login_request.user_id = user_id
    DB.collection('logindata').insert({:user_id=>user_id, :password=>login_request.password})
    session['user'] =@user
    redirect to('/app')
  end

  get '/logout' do
    @user = nil
    session.clear
    redirect to('/')
  end

  def find_user(username, password)
    user_doc = DB.collection('user').find_one({:email=>username})
    login_data = nil
    unless user_doc.nil?
      login_data = DB.collection('logindata').find_one(:user_id=>user_doc['_id'], :password => password)
    end

    login_data.nil? ? nil : user_doc
  end
end