import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  module ScoreEntry {
    public type Score = {
      principal : Principal;
      score : Nat;
    };

    public func compare(entry1 : Score, entry2 : Score) : Order.Order {
      Nat.compare(entry1.score, entry2.score);
    };
  };

  let scores = Map.empty<Principal, Nat>();

  public shared ({ caller }) func registerScore(newScore : Nat) : async () {
    let currentScore = scores.get(caller);
    switch (currentScore) {
      case (null) {
        scores.add(caller, newScore);
      };
      case (?existingScore) {
        if (newScore > existingScore) {
          scores.add(caller, newScore);
        } else {
          Runtime.trap("Score must be higher than current personal high score to register");
        };
      };
    };
  };

  public query ({ caller }) func getBestScore() : async Nat {
    switch (scores.get(caller)) {
      case (null) { Runtime.trap("No score to return") };
      case (?score) { score };
    };
  };

  public query func getLeaderboard() : async [ScoreEntry.Score] {
    scores.toArray().map(
      func((principal, score)) { { principal; score } }
    ).sort().reverse();
  };
};
