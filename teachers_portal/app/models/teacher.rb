class Teacher < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         authentication_keys: [:username]
  
  validates :username, presence: true, uniqueness: true
end