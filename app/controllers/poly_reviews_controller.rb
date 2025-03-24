class PolyReviewsController < ApplicationController
  #before_action :set_poly_review, only: %i[ index show update destroy ]

  # GET /poly_reviews
  def index
    @poly_reviews = PolyReview.all
    
    render json: @poly_reviews, status: :ok
  end

  # GET /poly_reviews/1
  def show
    
    render json: @poly_review
  end

  # POST /poly_reviews
  def create
    user = find_user
    rating = params[:stars].to_i
    if params[:reviewable_type] == "Toy"
      toy = Toy.find_by(id: params[:reviewable_id])
      PolyReview.create!(stars: rating, reviewable: toy, user_id: user.id)
    elsif params[:reviewable_type] == "User"
      customer = User.find_by(id: params[:reviewable_id])
      PolyReview.create!(stars: rating, reviewable: customer, user_id: customer.id)
    end
    render json: rating, status: :created
  end

  # PATCH/PUT /poly_reviews/1
  def update
    if @poly_review.update(poly_review_params)
      render json: @poly_review
    else
      render json: @poly_review.errors, status: :unprocessable_entity
    end
  end

  # DELETE /poly_reviews/1
  def destroy
    @poly_review.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_poly_review
      @poly_review = PolyReview.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    private

    def toy_params
        params.permit(:reviewable_type, :user_id, :reviewable_id, :toy_id)
    end
end
