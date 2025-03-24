require "rails_helper"

RSpec.describe PolyReviewsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/poly_reviews").to route_to("poly_reviews#index")
    end

    it "routes to #show" do
      expect(get: "/poly_reviews/1").to route_to("poly_reviews#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/poly_reviews").to route_to("poly_reviews#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/poly_reviews/1").to route_to("poly_reviews#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/poly_reviews/1").to route_to("poly_reviews#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/poly_reviews/1").to route_to("poly_reviews#destroy", id: "1")
    end
  end
end
