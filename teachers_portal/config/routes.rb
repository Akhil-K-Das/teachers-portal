Rails.application.routes.draw do
  root "students#index"
  devise_for :teachers
  resources :students#, only:[:index, :create, :update, :destroy]
end
