// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Types {

    struct Lesson {
        address creator;
        string notes;
        bool ispublished;
        string name;
    }

    struct Exercise {
        string question;
        Answer[] answers;
    }

    struct Answer {
        string text;
        bool isCorrect;
    }

    struct Review {
        string message;
        uint256 stars;
    }

} 