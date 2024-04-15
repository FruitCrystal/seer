const PageSwitcher = ({ page, setPage, total, onePageNum }: { page: number; setPage: Function; total: number; onePageNum: number }) => {
	return (
		<div>
			<div className="page-switcher">
				<button {...{ disabled: page === 1 }} className={page === 1 ? 'page-btn disabled' : 'page-btn'} onClick={() => setPage(1)}>
					首页
				</button>
				<button {...{ disabled: page === 1 }} className={page === 1 ? 'page-btn disabled' : 'page-btn'} onClick={() => setPage(page - 1)}>
					上一页
				</button>
				<span className="page-info">
					第{page}页/共{Math.ceil(total / onePageNum)}页
				</span>
				<button
					{...{ disabled: page === Math.ceil(total / onePageNum) }}
					className={page === Math.ceil(total / onePageNum) ? 'page-btn disabled' : 'page-btn'}
					onClick={() => setPage(page + 1)}
				>
					下一页
				</button>
				<button
					{...{ disabled: page === Math.ceil(total / onePageNum) }}
					className={page === Math.ceil(total / onePageNum) ? 'page-btn disabled' : 'page-btn'}
					onClick={() => setPage(Math.ceil(total / onePageNum))}
				>
					尾页
				</button>
			</div>
		</div>
	);
};

export default PageSwitcher;
