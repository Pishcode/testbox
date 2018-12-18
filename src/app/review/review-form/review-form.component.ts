import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../shared/models/review.model';
import { ReviewService } from '../../shared/services/review.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.sass']
})
export class ReviewFormComponent implements OnInit {
    form: FormGroup;
    starRating = 0;
    reviewText = '';
    @Input() bookId: string;

    constructor(
        private auth: AuthService,
        private reviewService: ReviewService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            'stars': this.starRating,
            'review': this.reviewText
        });

        this.form.valueChanges.subscribe(
            data => {
                this.starRating = data.stars;
                this.reviewText = data.review;
            }
        );
    }

    starHandler(value) {
        this.starRating = value;
    }

    onSubmit() {
        const review: Review = {
            bookId: this.bookId,
            userId: this.auth.userId,
            stars: this.starRating,
            review: this.reviewText
        };

        this.reviewService.saveReview(review);
    }
}
