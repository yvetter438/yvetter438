const highlightItems = document.querySelectorAll('.highlight-item');
        const projectContents = document.querySelectorAll('.project-content');

        highlightItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Remove active class from all highlights and contents
                highlightItems.forEach(hi => hi.classList.remove('active'));
                projectContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked highlight and corresponding content
                item.classList.add('active');
                projectContents[index].classList.add('active');
            });
        });

        // Show first project by default
        highlightItems[0].classList.add('active');
        projectContents[0].classList.add('active');