const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  navigation.classList.toggle('open', isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#brief-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const message = form.elements.message.value.trim();
  if (message.length < 10) {
    document.querySelector('#form-status').textContent = '프로젝트 이야기를 공백을 제외하고 10자 이상 적어 주세요.';
    form.elements.message.focus();
    return;
  }
  const content = ['웰메이크 프로젝트 요청서', '========================', '', `작성일: ${new Date().toLocaleDateString('ko-KR')}`, `프로젝트 유형: ${form.elements.service.value}`, `기업·기관명: ${form.elements.organization.value.trim() || '미기재'}`, '', '[프로젝트 이야기]', message, '', '이 요청서는 사용자의 기기에 저장되며 웰메이크에 자동 전송되지 않습니다.'].join('\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF', content], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'wellmake-project-brief.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#form-status').textContent = '요청서 파일을 저장했습니다. 작성 내용은 전송되지 않았습니다.';
});
