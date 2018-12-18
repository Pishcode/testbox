import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Review } from '../models/review.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    constructor(private afs: AngularFirestore) {
    }

    getUserReviews(userId: string) {
        const ratingRef = this.afs.collection('reviews',
            ref => ref.where('userId', '==', userId)
        );
        return ratingRef.valueChanges();
    }

    getBookReviews(bookId: string) {
        const reviewRef = this.afs.collection<Review>('reviews',
            ref => ref.where('bookId', '==', bookId)
        );
        return reviewRef.valueChanges();
    }

    getBookAvagareRating(bookId: string) {
        const reviewRef = this.afs.collection<Review>('reviews',
            ref => ref.where('bookId', '==', bookId)
        );

        return reviewRef.valueChanges().pipe(
            map(
                reviews => {
                    const ratings = reviews.map(v => v.stars);
                    return ratings.length ? ratings.reduce((total, val) => total + val) / reviews.length : 0;
                }
            )
        );
    }

    hasUserBookReview(bookId: string, userId) {
        const reviewRef = this.afs.collection<Review>('reviews',
            ref => ref.where('bookId', '==', bookId).where('userId', '==', userId)
        );

        return reviewRef.valueChanges().pipe(
            map(reviews => !!reviews.length)
        );
    }

    saveReview(review: Review) {
        this.afs.collection('reviews').add(review);
    }
}
