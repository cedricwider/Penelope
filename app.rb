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
    if (@user.nil? && request.path_info =~ /\/.+/)
      redirect('/', 303) unless request.path_info =~ /\/(login|signup)/
    end
  end

  # don't enable logging when running tests
  configure :production, :development do
    enable :logging
  end

  # define default routes here...
  get '/' do
    return haml :index, :attr_wrapper => '"' if @user.nil?
    redirect to('/home')
  end
end

require_relative 'models/init'
require_relative 'helpers/init'
require_relative 'routes/init'