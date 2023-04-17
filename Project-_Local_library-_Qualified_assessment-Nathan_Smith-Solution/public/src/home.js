function getTotalBooksCount(books) {
  const booksCount = books.reduce((count) => count + 1, 0);
  return booksCount;
}

function getTotalAccountsCount(accounts) {
  const accountsCount = accounts.reduce((count) => count + 1, 0);
  return accountsCount;
}

function getBooksBorrowedCount(books) {
  const count = books.filter(
    (book) => book.borrows[0].returned === false
  ).length;

  return count;
}

function getMostCommonGenres(books) {
  const commonGenres = [];

  for (let i = 0; i < books.length; i++) {
    let genre = books[i].genre;

    if (commonGenres.length === 0) {
      let firstGenre = {
        name: genre,
        count: 1,
      };

      commonGenres.push(firstGenre);
    }
    if (commonGenres.some((genreObject) => genreObject.name === genre)) {
      let index = commonGenres.findIndex(
        (genreItem) => genreItem.name === genre
      );

      commonGenres[index].count++;
    }

    if (!commonGenres.some((genreObject) => genreObject.name === genre)) {
      let genreToAdd = {
        name: genre,
        count: 1,
      };

      commonGenres.push(genreToAdd);
    }
  }
  commonGenres.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));
  if (commonGenres.length > 5) {
    return commonGenres.slice(0, 5);
  } else {
    return commonGenres;
  }
}

function getMostPopularBooks(books) {
  const popularBooks = [];

  for (let i = 0; i < books.length; i++) {
    let book = {
      name: books[i].title,
      count: getBookBorrowCount(books[i]),
    };
    popularBooks.push(book);
  }

  popularBooks.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));
  if (popularBooks.length > 5) {
    return popularBooks.slice(0, 5);
  } else {
    return popularBooks;
  }
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];

  for (let i = 0; i < books.length; i++) {
    let found = authors.find((author) => author.id === books[i].authorId);
    let authorObject = {
      name: found.name.first + " " + found.name.last,
      count: getBookBorrowCount(books[i]),
    };
    if (popularAuthors.some((author) => author.name === authorObject.name)) {
      let index = popularAuthors.findIndex(
        (authorItem) => authorItem.name === authorObject.name
      );
      popularAuthors[index].count += authorObject.count;
    } else {
      popularAuthors.push(authorObject);
    }
  }

  popularAuthors.sort((authorA, authorB) =>
    authorA.count < authorB.count ? 1 : -1
  );
  if (popularAuthors.length > 5) {
    return popularAuthors.slice(0, 5);
  } else {
    return popularAuthors;
  }
}

function getBookBorrowCount(book) {
  const count = book.borrows.length;
  return count;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
