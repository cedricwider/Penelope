require 'digest/md5'

class Penelope < Sinatra::Application

  get '/app' do
    hash = Digest::MD5.hexdigest(@user.email)
    @gravatar_url= "http://www.gravatar.com/avatar/#{hash}"
    puts @gravatar_url
    haml :app
  end

  get '/home/edit_event_template' do
    partial :partial_edit_event
  end

  get '/home/event_list_item_template' do
    partial :partial_event_list_item
  end
end