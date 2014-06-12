class Penelope < Sinatra::Application

  get '/partials/:file_name' do
    partial ('/partials/' + params[:file_name]).to_sym
  end
end