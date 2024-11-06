class Student < ApplicationRecord
    validates :name, presence: { message: "can't be blank" }, length: { minimum: 1, maximum:20}
    validates :subject_name, presence: { message: "can't be blank" }, length: { minimum: 1}
    validates :marks, presence: { message: "can't be blank" }, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
end
