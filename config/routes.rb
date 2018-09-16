Rails.application.routes.draw do
  resources :vehicles, only: [:show] do
    get :search, on: :collection
  end
  root to: "calculator#index"
end
