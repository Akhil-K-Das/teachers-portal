class StudentsController < ApplicationController
  before_action :authenticate_teacher!
  before_action :select_student, only: [:show, :edit, :update, :destroy]

  def index
    @students = Student.all
  
    # Case-insensitive search using LOWER for MySQL
    if params[:search].present?
      @students = @students.where("LOWER(name) LIKE ?", "%#{params[:search].downcase}%")
    end
  
    # Filter by subject
    if params[:subject].present?
      @students = @students.where(subject_name: params[:subject])
    end
  
    # Filter by performance levels
    case params[:performance]
    when "top"
      @students = @students.where("marks >= ?", 85)
    when "average"
      @students = @students.where("marks BETWEEN ? AND ?", 50, 84)
    when "struggling"
      @students = @students.where("marks < ?", 50)
    end
  
    # Get list of unique subjects for dropdown
    @subjects = Student.pluck(:subject_name).uniq
  end
  

  def new
    @student = Student.new
    puts @student.inspect
  end

  def show
  end

  def edit
  end

  def create
    existing_student = Student.find_by(name: params[:student][:name], subject_name: params[:student][:subject_name])
    
    # If an existing student is found
    if existing_student
      additional_marks = params[:student][:marks].to_i
  
      # Handle case where additional marks are negative
      if additional_marks < 0
        message = "Marks cannot be negative."
  
        # Respond with JSON for AJAX request
        respond_to do |format|
          format.json { render json: { success: false, errors: [message] }, status: :unprocessable_entity }
          format.html do
            flash.now[:alert] = message
            @student = Student.new(student_params)  
            render :new, status: :unprocessable_entity  
          end
        end
  
      else
        # Update existing student's marks
        existing_student.update(marks: existing_student.marks + additional_marks)
        
        respond_to do |format|
          format.json { render json: { success: true, message: "Marks updated for existing student." } }
          format.html { redirect_to students_path, notice: "Marks updated for existing student." }
        end
      end
  
    else
      # Create a new student if no existing student is found
      @student = Student.new(student_params)
      
      respond_to do |format|
        if @student.save
          format.json { render json: { success: true, student: @student } }
          format.html { redirect_to students_path, notice: "Student successfully created." }
        else
          format.json { render json: { success: false, errors: @student.errors.full_messages }, status: :unprocessable_entity }
          format.html do
            flash.now[:alert] = @student.errors.full_messages.join(", ")
            render :new, status: :unprocessable_entity
          end
        end
      end
    end
  end
  

  def update
    if @student.update(student_params)
      render json: { success: true, student: @student }
    else
      render json: { success: false, errors: student.errors.full_messages }
    end
  end

  def destroy
    if @student.destroy
      render json: { success: true }, status: :ok
    else
      render json: { success: false, errors: "Failed to delete student" }, status: :unprocessable_entity
    end
  end

  private

  def authenticate_teacher!
    unless teacher_signed_in?  # Replace with your method to check if a teacher is signed in
      redirect_to new_teacher_session_path, alert: "You need to sign in before accessing this page."
    end
  end

  def student_params
    params.require(:student).permit(:name, :subject_name, :marks)
  end

  def select_student
    @student = Student.find(params[:id])
  end
end
