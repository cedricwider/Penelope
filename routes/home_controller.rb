class Penelope < Sinatra::Application
  get '/home' do
    haml :home
  end

  get '/home/edit_event_template' do
    partial :partial_edit_event
  end

  get '/home/event_list_item_template' do
    partial :partial_event_list_item
  end
end