require 'sinatra'
require 'mongo'
require 'json'
require 'haml'

class Penelope < Sinatra::Application

  enable :sessions

  # set folder for templates to 'views'
  set :views, File.expand_path('../views', __FILE__)

  before do
    @app_name = 'Penelope'
    @title = @app_name
    @user = session['user']
  end

  # don't enable logging when running tests
  configure :production, :development do
    enable :logging
  end

  # define default routes here...
  get '/' do
    if @user.nil?
      haml :index, :attr_wrapper => '"'
    else
      redirect to('/home')
    end
  end

  get '/home' do
    haml :home
  end

end

require_relative 'models/init'
require_relative 'helpers/init'
require_relative 'routes/init'