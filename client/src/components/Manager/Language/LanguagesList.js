import React from 'react'

const LanguagesList = () => {
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>French</td>
                        <td>
                            <i className="fas fa-pen icon edit mr-2"></i>
                            <i className="fas fa-trash icon remove"></i>
                        </td>
                    </tr>
                    <tr>
                        <td>English</td>
                        <td>
                            <i className="fas fa-pen icon edit mr-2"></i>
                            <i className="fas fa-trash icon remove"></i>
                        </td>
                    </tr>
                    <tr>
                        <td>Spanish</td>
                        <td>
                            <i className="fas fa-pen icon edit mr-2"></i>
                            <i className="fas fa-trash icon remove"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="row align-items-center">
                <div className="col-sm-12 col-md-5">
                    <div
                        className="dataTables_info"
                        id="example2_info"
                        role="status"
                        aria-live="polite"
                    >
                        Showing 1 to 10 of 57 entries
                    </div>
                </div>
                <div className="col-sm-12 col-md-7">
                    <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                    >
                        <ul className="pagination">
                            <li
                                className="paginate_button page-item previous disabled"
                                id="example2_previous"
                            >
                                <a
                                    href="#"
                                    aria-controls="example2"
                                    data-dt-idx={0}
                                    tabIndex={0}
                                    className="page-link"
                                >
                                    Previous
                                </a>
                            </li>
                            <li className="paginate_button page-item active">
                                <a
                                    href="#"
                                    aria-controls="example2"
                                    data-dt-idx={1}
                                    tabIndex={0}
                                    className="page-link"
                                >
                                    1
                                </a>
                            </li>
                            <li className="paginate_button page-item ">
                                <a
                                    href="#"
                                    aria-controls="example2"
                                    data-dt-idx={2}
                                    tabIndex={0}
                                    className="page-link"
                                >
                                    2
                                </a>
                            </li>
                            <li className="paginate_button page-item ">
                                <a
                                    href="#"
                                    aria-controls="example2"
                                    data-dt-idx={3}
                                    tabIndex={0}
                                    className="page-link"
                                >
                                    3
                                </a>
                            </li>
                            <li className="paginate_button page-item ">
                                <a
                                    href="#"
                                    aria-controls="example2"
                                    data-dt-idx={4}
                                    tabIndex={0}
                                    className="page-link"
                                >
                                    4
                                </a>
                            </li>
                            <li className="paginate_button page-item ">
                                <a
                                    href="#"
                                    aria-controls="example2"
                                    data-dt-idx={5}
                                    tabIndex={0}
                                    className="page-link"
                                >
                                    5
                                </a>
                            </li>
                            <li className="paginate_button page-item ">
                                <a
                                    href="#"
                                    aria-controls="example2"
                                    data-dt-idx={6}
                                    tabIndex={0}
                                    className="page-link"
                                >
                                    6
                                </a>
                            </li>
                            <li
                                className="paginate_button page-item next"
                                id="example2_next"
                            >
                                <a
                                    href="#"
                                    aria-controls="example2"
                                    data-dt-idx={7}
                                    tabIndex={0}
                                    className="page-link"
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LanguagesList