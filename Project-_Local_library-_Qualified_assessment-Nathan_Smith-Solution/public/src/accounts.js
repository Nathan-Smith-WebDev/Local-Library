const bookUtility = require("./books.js");

function findAccountById(accounts, id) {
  const found = accounts.find((account) => account.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
  const found = accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return found;
}

function getTotalNumberOfBorrows(account, books) {
  const borrow = findBookBorrowedByAccountID(account, books).length;

  return borrow;
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksByAccount = findBookBorrowedByAccountID(account, books);
  const booksWithAuthors = [];
  for (let i = 0; i < booksByAccount.length; i++) {
    let foundAuthor = bookUtility.findAuthorById(
      authors,
      booksByAccount[i].authorId
    );
    let bookWithAuthor = {
      ...booksByAccount[i],
      author: foundAuthor,
    };
    // for (let j = 0; j < bookWithAuthor.borrows.length; j++) {
      if (
        bookWithAuthor.borrows[0].id === account.id &&
        bookWithAuthor.borrows[0].returned === false
      ) {
        booksWithAuthors.push(bookWithAuthor);
      }
   // }
  }

  return booksWithAuthors;
}

function findBookBorrowedByAccountID(account, books) {
  const userBooks = [];

  books.forEach((book) => {
    book.borrows.forEach((bookBorrow) => {
      if (bookBorrow.id === account.id) {
        userBooks.push(book);
      }
    });
  });
  return userBooks;
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
